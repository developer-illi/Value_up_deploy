import { TextInput } from '~/components/text-input'
import { TextareaInput } from '~/components/textarea-input'

export const Field = {
  Text: TextInput,
  Textarea: TextareaInput,
} as const
