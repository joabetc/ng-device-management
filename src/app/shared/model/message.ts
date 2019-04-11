import { MessageTypes } from './message-types';

export interface Message {
  type: MessageTypes;
  message: string;
}