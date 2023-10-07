class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (message.toLowerCase().includes('hello')) {
      this.actionProvider.handleStudent();
    }

    setTimeout(()=>{
      this.actionProvider.handleDateTime();
    }, "4000");
  }
}

export default MessageParser;