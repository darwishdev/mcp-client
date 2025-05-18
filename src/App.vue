<script setup lang="ts">
import { ref, nextTick } from "vue";
import { apiClient } from "@/api/apiClient";
import type { SendMessageResponse } from "@buf/ahmeddarwish_mcp-client-api.bufbuild_es/mcpclient/v1/mcpclient_service_pb";

// Define a type for a chat message to differentiate sender
interface ChatMessage {
  id: number; // Unique identifier for the message
  content: string;
  sender: "user" | "api"; // 'user' for sent messages, 'api' for responses
  status?: "sending" | "sent" | "failed" | "streaming"; // Added 'streaming'
}

// Reactive state for the list of messages
const messages = ref<ChatMessage[]>([]);
// Reactive state for the current message being typed
const newMessageContent = ref("");
// Reactive state to disable input/button while sending/streaming
const isLoading = ref(false);
// Template ref for the messages container to enable auto-scrolling
const messagesContainer = ref<HTMLElement | null>(null);

// Function to send the message
const sendMessage = async () => {
  const content = newMessageContent.value.trim();
  if (!content || isLoading.value) {
    return; // Don't send empty messages or if already sending/streaming
  }

  isLoading.value = true; // Disable input/button
  newMessageContent.value = ""; // Clear the input field immediately

  // Add the user's message to the chat
  messages.value.push({
    id: Date.now(), // Simple timestamp ID
    content: content,
    sender: "user",
    status: "sent", // User message is immediately sent from UI perspective
  });

  // Scroll to the latest message (user's message)
  scrollToLatestMessage();

  try {
    // Call the API client which returns an AsyncIterable
    const responseStream: AsyncIterable<SendMessageResponse> =
      apiClient.sendMessage({ content: content });

    // Iterate over the streaming response
    for await (const responseChunk of responseStream) {
      // Add each received chunk as a new API message bubble
      messages.value.push({
        id: Date.now() + Math.random(), // Use random for unique ID during fast streaming
        content: responseChunk.content,
        sender: "api",
        status: "streaming", // Indicate that this is part of a stream
      });

      // Scroll to the latest message (the new API chunk)
      scrollToLatestMessage();
    }

    // After the loop finishes, the stream is complete
    // Optionally update the status of the last API message if you want to mark completion
    if (
      messages.value.length > 0 &&
      messages.value[messages.value.length - 1].sender === "api"
    ) {
      messages.value[messages.value.length - 1].status = "sent";
    }
  } catch (error) {
    console.error("Error sending message:", error);
    // Add an error message to the chat
    messages.value.push({
      id: Date.now() + Math.random(),
      content: "Error receiving message.",
      sender: "api", // Or 'system'
      status: "failed",
    });
    // Scroll to the latest message (the error message)
    scrollToLatestMessage();
  } finally {
    isLoading.value = false; // Re-enable input/button after stream ends or errors
  }
};

// Function to scroll the messages container to the bottom
const scrollToLatestMessage = () => {
  // Use nextTick to ensure the DOM is updated before scrolling
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth", // Optional: smooth scrolling animation
      });
    }
  });
};
</script>

<template>
  <div class="chat-container">
    <h2>Simple Chat</h2>

    <div ref="messagesContainer" class="messages-display">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message-bubble', `message-${message.sender}`]"
      >
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>

    <div class="input-area">
      <input
        type="text"
        v-model="newMessageContent"
        @keyup.enter="sendMessage"
        :disabled="isLoading"
        placeholder="Type your message..."
      />
      <button
        @click="sendMessage"
        :disabled="!newMessageContent.trim() || isLoading"
      >
        {{ isLoading ? "..." : "Send" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Or a fixed height like 500px */
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
}

h2 {
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  margin: 0;
}

.messages-display {
  flex-grow: 1; /* Takes up available space */
  padding: 10px;
  overflow-y: auto; /* Enable scrolling */
  display: flex;
  flex-direction: column; /* Stack messages vertically */
}

.message-bubble {
  max-width: 80%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 15px;
  word-wrap: break-word; /* Prevent long words from overflowing */
}

.message-user {
  align-self: flex-end; /* Align user messages to the right */
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 2px; /* Tail effect */
}

.message-api {
  align-self: flex-start; /* Align API messages to the left */
  background-color: #e9e9eb;
  color: #333;
  border-bottom-left-radius: 2px; /* Tail effect */
}

.message-content {
  /* Add any specific styling for message text if needed */
}

.message-status {
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
}

.message-status.error {
  color: red;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
}

.input-area input {
  flex-grow: 1; /* Takes up available space */
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.input-area button {
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.input-area button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.input-area button:hover:not(:disabled) {
  background-color: #218838;
}
</style>
