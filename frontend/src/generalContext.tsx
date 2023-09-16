import { useCompletion } from 'ai/react'
import { ReactNode, createContext, useRef, useState } from 'react'

type statusType = 'idle' | 'converting' | 'uploading' | 'generating' | 'success'

interface IGeneralContext {
  videoFile: File | null
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>
  promptInputRef: React.RefObject<HTMLTextAreaElement>
  temperature: number
  setTemperature: React.Dispatch<React.SetStateAction<number>>
  videoId: string
  setVideoId: React.Dispatch<React.SetStateAction<string>>
  selectedTemplate: string
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>
  aiResponse: string
  setAiResponse: React.Dispatch<React.SetStateAction<string>>

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  completion: string
  status: statusType
  setStatus: React.Dispatch<React.SetStateAction<statusType>>
}

export const GeneralContext = createContext<IGeneralContext>(
  {} as IGeneralContext,
)

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [aiResponse, setAiResponse] = useState<string>('')
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState<statusType>('idle')

  const {
    handleSubmit,
    handleInputChange,
    isLoading,
    input,
    setInput,
    completion,
  } = useCompletion({
    api: `${import.meta.env.VITE_BACKEND_URL}/ai/generateResponse`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <GeneralContext.Provider
      value={{
        videoFile,
        setVideoFile,
        promptInputRef,
        temperature,
        setTemperature,
        videoId,
        setVideoId,
        selectedTemplate,
        setSelectedTemplate,
        aiResponse,
        setAiResponse,
        handleSubmit,
        handleInputChange,
        isLoading,
        input,
        setInput,
        completion,
        status,
        setStatus,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}
