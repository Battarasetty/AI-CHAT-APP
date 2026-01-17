export async function mockAIResponse(messages: any[]) {
  return messages[messages.length - 1].content
}
