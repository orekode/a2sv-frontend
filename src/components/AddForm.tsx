import Form from './Form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import axios from 'axios'

interface FormData {
  food_name: string
  food_rating: string
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: string
}

interface InputField {
  name: keyof FormData
  placeholder: string
  type: string
  validation?: {
    pattern?: {
      value: RegExp
      message: string
    }
  }
}

interface SelectField {
  name: keyof FormData
  placeholder: string
  options: { value: string; label: string }[]
}

const AddForm = ({ trigger, setTrigger }: { trigger: boolean; setTrigger: (value: boolean) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      food_name: '',
      food_rating: '',
      food_image: '',
      restaurant_name: '',
      restaurant_logo: '',
      restaurant_status: '',
    },
  })

  const inputFields: InputField[] = [
    { name: 'food_name', placeholder: 'Food name', type: 'text' },
    {
      name: 'food_rating',
      placeholder: 'Food rating',
      type: 'text',
      validation: { pattern: { value: /^[0-5]$/, message: 'Rating must be between 0 and 5' } },
    },
    {
      name: 'food_image',
      placeholder: 'Food image (link)',
      type: 'text',
      validation: { pattern: { value: /^https?:\/\/.+$/, message: 'Must be a valid URL' } },
    },
    { name: 'restaurant_name', placeholder: 'Restaurant name', type: 'text' },
    {
      name: 'restaurant_logo',
      placeholder: 'Restaurant logo (link)',
      type: 'text',
      validation: { pattern: { value: /^https?:\/\/.+$/, message: 'Must be a valid URL' } },
    },
  ]

  const selectFields: SelectField[] = [
    {
      name: 'restaurant_status',
      placeholder: 'Restaurant Status (open / close)',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' },
      ],
    },
  ]

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('https://a2sv-api.b3trtransit.com/api/products', data)
      toast.success('Product added successfully!')
      reset()
      setTrigger(false)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to add product'
      toast.error(errorMessage)
    }
  }

  return (
    <div>
      <Form title="Edit Product" trigger={trigger} setTrigger={setTrigger}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputFields.map((field, index) => (
            <div key={`input-${index}`} className="input flex mb-3">
              <input
                {...register(field.name, {
                  required: `${field.placeholder} is required`,
                  ...field.validation,
                })}
                type={field.type}
                className="input p-3"
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          {selectFields.map((field, index) => (
            <div key={`select-${index}`} className="input flex mb-3">
              <select
                {...register(field.name, {
                  required: 'Restaurant status is required',
                })}
                className="input p-3"
                defaultValue=""
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option, optIndex) => (
                  <option key={`option-${optIndex}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <button type="submit" className="button bg-orange-600 text-white">
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                reset()
                setTrigger(false)
              }}
              className="button border border-orange-400 text-orange-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddForm