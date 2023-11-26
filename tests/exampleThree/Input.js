/* global HTMLElement */
/* global CustomEvent */
/* global self */
/* global Vosk */
/* global AudioContext */
/* global AudioWorkletNode */

export default class Input extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
        }
        :host > input {
          flex-grow: 15;
          height: 3em;
        }
        :host > button {
          cursor: pointer;
          flex-grow: 1;
          min-height: 100%;
          word-break: break-all;
        }
        :host > button#peer-web-site {
          flex-grow: 2;
        }
      </style>
      <input placeholder="Click here to speak your message!">
      <button>send</button>
      <button id=peer-web-site>&#10000; attach media</button>
    `
    this.changeEventListener = (event, input) => {
      this.dispatchEvent(new CustomEvent('yjs-input', {
        detail: {
          input: input || event.composedPath()[0]
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      this.utterance = []
      this.lastValue = ''
    }
    this.focusEventListener = async event => {
      if (this.model) (await this.model).start()
      this.input.placeholder = 'Speak your message now!'
    }
    this.blurEventListener = async event => {
      if (this.model) (await this.model).stop()
      this.changeEventListener(undefined, this.input)
      this.input.placeholder = 'Click here to speak your message!'
    }
    this.clickEventListener = event => {
      if (event.composedPath()[0].getAttribute('id') === 'peer-web-site') self.open('https://peerweb.site/')
    }
    this.model = this.vosk(true)
  }

  connectedCallback () {
    this.shadowRoot.addEventListener('change', this.changeEventListener)
    this.shadowRoot.addEventListener('focus', this.focusEventListener, { capture: true, passive: true })
    this.shadowRoot.addEventListener('blur', this.blurEventListener, { capture: true, passive: true })
    this.shadowRoot.addEventListener('click', this.clickEventListener)
    self.addEventListener('message', event => {
      if (!event.data.title || !event.data.href || event.origin !== 'https://peerweb.site') return
      this.input.value = `${event.data.title} 👉 ${event.data.href} <span class=peer-web-site>(temporary hosted media content @peerweb.site)</span></a>`
      this.changeEventListener(undefined, this.input)
    })
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('change', this.changeEventListener)
    this.shadowRoot.removeEventListener('focus', this.focusEventListener)
    this.shadowRoot.removeEventListener('blur', this.blurEventListener)
    this.shadowRoot.removeEventListener('click', this.clickEventListener)
  }

  async vosk () {
    this.input.placeholder = 'Loading speech...'

    const channel = new MessageChannel()
    const model = await Vosk.createModel(`${import.meta.url.replace(/(.*\/)(.*)$/, '$1')}vosk-model-small-en-us-0.15.tar.gz`)
    model.registerPort(channel.port1)

    const sampleRate = 48000
    const recognizer = new model.KaldiRecognizer(sampleRate)
    recognizer.setWords(true)

    this.utterance = []
    this.lastValue = ''
    recognizer.on('result', (message) => {
      (this.utterance = [...this.utterance, message.result]).map((utt, uindex) =>
        utt?.result?.map((word, windex) => word.word + '')
      )
      let send = false
      let deleteText = false
      this.input.value = this.lastValue + this.utterance.reduce((acc, word) => {
        if (word.text === 'send') {
          send = true
          return ''
        }
        if (word.text === 'delete' || word.text === 'erase') {
          deleteText = true
          return ''
        }
        return word.text ? word.text + '. ' : ''
      }, '')
      this.lastValue = this.input.value
      if (deleteText) {
        this.input.value = ''
        this.utterance = []
        this.lastValue = ''
      } else if (send) {
        this.changeEventListener(undefined, this.input)
      }
      this.input.scrollLeft = this.input.scrollWidth
    })
    recognizer.on('partialresult', (message) => {
      if (!message.result.partial.trim()) return
      if (/\]$/g.test(this.input.value.trim())) {
        this.input.value = this.input.value.replace(/\[.*\]/, `[${message.result.partial}]`)
      } else {
        this.input.value += `[${message.result.partial}]`
      }
      this.input.scrollLeft = this.input.scrollWidth
    })

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
        sampleRate
      }
    })
    this.audioContext = new AudioContext()
    await this.audioContext.audioWorklet.addModule(`${import.meta.url.replace(/(.*\/)(.*)$/, '$1')}recognizer-processor.js`)
    const recognizerProcessor = new AudioWorkletNode(this.audioContext, 'recognizer-processor', { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 })
    recognizerProcessor.port.postMessage({ action: 'init', recognizerId: recognizer.id }, [channel.port2])
    recognizerProcessor.connect(this.audioContext.destination)
    const source = this.audioContext.createMediaStreamSource(mediaStream)

    const start = async () => {
      source.connect(recognizerProcessor)
    }

    const stop = async () => {
      source.disconnect(recognizerProcessor)
    }

    this.input.focus()
    this.input.placeholder = 'Click here to speak your message!'
    return { model, mediaStream, start, stop }
  }

  get input () {
    return this.shadowRoot.querySelector('input')
  }
}
