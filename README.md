
# Upload.AI
> **Note:** The project name isn't a clickable link. Markdown can sometimes make text look like a link when we don't intend it to.

Welcome to Upload.AI! This project is perfect for companies that have video content showcasing their products and/or services and are looking to create a smart chatbot.

## How It Works
Here's the step-by-step guide to get you started:

1. **Upload Your Video**: Simply upload the video that contains information about your products or services.
2. **Add Specific Words (Optional)**: If your video contains specialized terms or names that might be hard to recognize, you can type them in to help the AI understand better.
3. **Click 'Upload'**: Hit the upload button to send your file. (Yes, it's that obvious, but we're mentioning it just in case!)
4. **Backend Magic**: Behind the scenes, the backend will convert your video file into an MP3. Remember, we're using the audio, not the video.
5. **Meet Whisper**: Our AI, named Whisper, will transcribe the audio content for you.
6. **Database Storage**: The transcription is then saved in an SQLite Database File.
7. **Frontend Fun**: Now you can query the OpenAI API about the content. We're currently using GPT-3.5-turbo for this.

> **Important:** To use this service, you'll need an OpenAI Token. Register on the OpenAI API website, create a token, and then follow the `.env.example` format to set up your environment variables in the backend project.

In this repository, you'll find two folders: one for the frontend and one for the backend.


For the frontend we used...

<div style='flex'>
  <img src='/frontend/public/Stacks/typescript.jpg' width="60px"/>
  Typescript
</div>


For the backend we used...

