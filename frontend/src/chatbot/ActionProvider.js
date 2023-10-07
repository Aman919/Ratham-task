import DateTimePickerWidget from "./widgets/DateTimePickerWidget"
import GotItWidget from "./widgets/gotIt";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage, ...rest) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc; 
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleStudent() {
    const message = this.createChatBotMessage(
      <GotItWidget onGotItClick={this.handlePickSlot} />
    );
    this.handleUpdate(message);
  }

  handleDateTime() {
    const message = this.createChatBotMessage(
      <DateTimePickerWidget />
    );
    this.handleUpdate(message);
  }

  //now we need to insert this into chatbot state
  handleUpdate(message) {
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }
}

export default ActionProvider;