export type MessageOrigin = "user" | "model";
export interface ChatMessage {
  role: MessageOrigin;
  parts: [
    {
      text: string;
      type: "text";
    },
  ];
}