import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import {
  BookUp2,
  Briefcase,
  Building,
  Languages,
  UserCheck,
  Users,
} from 'lucide-react'
import { Label } from '../../components/ui/label'

const ContactFormSchema = z.object({
  // Информация за клиента
  organizationName: z.string().min(1, 'Името на организацията е задължително'),
  mainActivities: z.string().min(1, 'Основната дейност е задължителна'),
  address: z.string().min(1, 'Адресът е задължителен'),
  phone: z.string().min(1, 'Телефонът е задължителен'),
  email: z.string().email('Невалиден имейл адрес'),
  website: z.string().optional(),

  // Ръководител на организация
  managerFullName: z.string().min(1, 'Името на ръководителя е задължително'),
  managerPosition: z
    .string()
    .min(1, 'Длъжността на ръководителя е задължителна'),

  // Лице за контакт
  contactFullName: z
    .string()
    .min(1, 'Името на лицето за контакт е задължително'),
  contactPosition: z
    .string()
    .min(1, 'Длъжността на лицето за контакт е задължителна'),
  contactPhone: z
    .string()
    .min(1, 'Телефонът на лицето за контакт е задължителен'),
  contactEmail: z.string().email('Невалиден имейл адрес'),

  // Описание на свободното място
  jobPosition: z.string().min(1, 'Длъжността е задължителна'),
  requiredWorkers: z.number().min(1, 'Необходим е поне един работник'),
  responsibilities: z
    .string()
    .min(1, 'Функционалните отговорности са задължителни'),
  employmentType: z.string().min(1, 'Типът на наемане е задължителен'),
  schedule: z.string().min(1, 'Графикът е задължителен'),
  grossMonthlyIncome: z.string().min(1, 'Месечният доход е задължителен'),
  taxDeductions: z.string().min(1, 'Данъчните удръжки са задължителни'),
  netSalary: z.string().min(1, 'Нетната заплата е задължителна'),
  bonuses: z.string().optional(),
  probationPeriod: z
    .string()
    .min(1, 'Продължителността на изпитателния срок е задължителна'),

  // Изисквания към кандидата
  candidateRequirements: z.object({
    genderAgeMaritalStatus: z.string().optional(),
    education: z.string().min(1, 'Образованието е задължително'),
    experience: z.string().min(1, 'Опитът е задължителен'),
    personalQualities: z
      .string()
      .min(1, 'Личностните качества са задължителни'),
    healthRequirements: z.string().optional(),
  }),

  // Социален пакет от работодателя
  socialPackage: z.object({
    visaCosts: z.string().optional(),
    transportCosts: z.string().optional(),
    airportTransfer: z.string().optional(),
    workPermitAssistance: z.string().optional(),
    accommodationCosts: z.string().optional(),
    foodCosts: z.string().optional(),
    trainingCosts: z.string().optional(),
    commuteCosts: z.string().optional(),
    healthInsurance: z.string().optional(),
    otherInsurance: z.string().optional(),
  }),

  // Владеене на езици
  languageSkills: z.string().min(1, 'Владеенето на езици е задължително'),

  // Подпис
  signatoryPosition: z.string().min(1, 'Длъжността е задължителна'),
  signatoryFullName: z.string().min(1, 'Пълното име е задължително'),
})

type ContactForm = z.infer<typeof ContactFormSchema>

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className='body-12-regular text-destructive-foreground'>
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? 'Валидиране...' : null}
    </>
  )
}

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<string>('')

  const form = useForm({
    defaultValues: {
      organizationName: '',
      mainActivities: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      managerFullName: '',
      managerPosition: '',
      contactFullName: '',
      contactPosition: '',
      contactPhone: '',
      contactEmail: '',
      jobPosition: '',
      requiredWorkers: 1,
      responsibilities: '',
      employmentType: '',
      schedule: '',
      grossMonthlyIncome: '',
      taxDeductions: '',
      netSalary: '',
      bonuses: '',
      probationPeriod: '',
      candidateRequirements: {
        genderAgeMaritalStatus: '',
        education: '',
        experience: '',
        personalQualities: '',
        healthRequirements: '',
      },
      socialPackage: {
        visaCosts: '',
        transportCosts: '',
        airportTransfer: '',
        workPermitAssistance: '',
        accommodationCosts: '',
        foodCosts: '',
        trainingCosts: '',
        commuteCosts: '',
        healthInsurance: '',
        otherInsurance: '',
      },
      languageSkills: '',
      signatoryPosition: '',
      signatoryFullName: '',
    } as ContactForm,
    onSubmit: async ({ value }: { value: ContactForm }) => {
      // Convert form data to text format
      const textData = `
Информация за клиента:
Име на организацията: ${value.organizationName}
Основна дейности: ${value.mainActivities}
Адрес: ${value.address}
Телефон: ${value.phone}
Електронна поща: ${value.email}
Уеб сайт: ${value.website}

Ръководител на организация:
Пълно име, длъжност: ${value.managerFullName}, ${value.managerPosition}

Лице за контакт:
Пълно име, длъжност: ${value.contactFullName}, ${value.contactPosition}
Телефон: ${value.contactPhone}
Електронна поща: ${value.contactEmail}

Описание на свободното място:
Длъжност: ${value.jobPosition}
Необходим брой работници: ${value.requiredWorkers}
Функционални отговорности: ${value.responsibilities}
Наемане на работа: ${value.employmentType}
График: ${value.schedule}
Приблизителен Месечен доход (брутен): ${value.grossMonthlyIncome}
Данъчни удръжки: ${value.taxDeductions}
Ниво на заплата (нето): ${value.netSalary}
Бонуси: ${value.bonuses}
Продължителност на изпитателния срок: ${value.probationPeriod}

Изисквания към кандидата:
Пол, възраст, семейно положение: ${value.candidateRequirements.genderAgeMaritalStatus}
Образование: ${value.candidateRequirements.education}
Опит: ${value.candidateRequirements.experience}
Личностни качества: ${value.candidateRequirements.personalQualities}
Здравни изисквания: ${value.candidateRequirements.healthRequirements}

Социален пакет от работодателя:
Разходи за виза: ${value.socialPackage.visaCosts}
Транспортни разходи: ${value.socialPackage.transportCosts}
Трансфер от летището: ${value.socialPackage.airportTransfer}
Съдействие за разрешително за работа: ${value.socialPackage.workPermitAssistance}
Разходи за настаняване: ${value.socialPackage.accommodationCosts}
Разходи за храна: ${value.socialPackage.foodCosts}
Разходи за обучение: ${value.socialPackage.trainingCosts}
Разходи за пътуване до работа: ${value.socialPackage.commuteCosts}
Здравна застраховка: ${value.socialPackage.healthInsurance}
Други застраховки: ${value.socialPackage.otherInsurance}

Владеене на езици: ${value.languageSkills}

Длъжност: ${value.signatoryPosition}
Пълно име (подпис): ${value.signatoryFullName}
      `

      setFormData(textData)

      try {
        // Send data to API using the sendcopy functionality
        const response = await fetch('/api/sendcopy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: textData,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        // Set form data to display success message
        setFormData(textData)
      } catch (error) {
        console.error('Error submitting form:', error)
        // Handle error (you might want to show an error message to the user)
      }
    },
  })

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  // Step 1
  const renderStep1 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Информация за клиента
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8 grid-cols-1 lg:grid-cols-6'>
        <form.Field
          name='organizationName'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Името на организацията е задължително' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Име на организацията</Label>
              <Input
                id={field.name}
                placeholder='Въведете име на организацията'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='mainActivities'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Основната дейност е задължителна' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Основна дейности</Label>
              <Input
                id={field.name}
                placeholder='Въведете основна дейност'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='address'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Адресът е задължителен' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Адрес</Label>
              <Input
                id={field.name}
                placeholder='Въведете адрес'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='phone'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Телефонът е задължителен' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Телефон</Label>
              <Input
                id={field.name}
                placeholder='Въведете телефон'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='email'
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Имейлът е задължителен'
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return 'Невалиден имейл адрес'
              return undefined
            },
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Електронна поща</Label>
              <Input
                id={field.name}
                type='email'
                placeholder='Въведете имейл'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='website'>
          {(field) => (
            <div className='flex flex-col gap-4 colspan-full lg:col-span-4 lg:col-start-2'>
              <Label htmlFor={field.name}>Уеб сайт</Label>
              <Input
                id={field.name}
                placeholder='Въведете уеб сайт'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <form.Subscribe
          selector={(state) => {
            const step1Fields = [
              state.fieldMeta.organizationName,
              state.fieldMeta.mainActivities,
              state.fieldMeta.address,
              state.fieldMeta.phone,
              state.fieldMeta.email,
            ]

            const hasErrors = step1Fields.some(
              (field) => field?.errors && field.errors.length > 0
            )

            const allTouched = step1Fields.every((field) => field?.isTouched)

            return !hasErrors && allTouched
          }}
        >
          {(canProceed) => (
            <Button onClick={nextStep} disabled={!canProceed}>
              Напред
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )

  // Step 2
  const renderStep2 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Ръководител и лице за контакт
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className=''>
          <h3 className='text-lg font-medium mb-4 '>
            Ръководител на организация
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-6 gap-8 '>
            <form.Field
              name='managerFullName'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Името на ръководителя е задължително' : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4 col-span-full lg:col-span-3 '>
                  <Label htmlFor={field.name}>Пълно име</Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете пълно име'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name='managerPosition'
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Длъжността на ръководителя е задължителна'
                    : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4  col-span-full lg:col-span-3'>
                  <Label htmlFor={field.name}>Длъжност</Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете длъжност'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        <div className='border-t border-input pt-6'>
          <h3 className='text-lg font-medium mb-4'>Лице за контакт</h3>
          <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <form.Field
              name='contactFullName'
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Името на лицето за контакт е задължително'
                    : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
                  <Label htmlFor={field.name}>Пълно име</Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете пълно име'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name='contactPosition'
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Длъжността на лицето за контакт е задължителна'
                    : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
                  <Label htmlFor={field.name}>Длъжност</Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете длъжност'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name='contactPhone'
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Телефонът на лицето за контакт е задължителен'
                    : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
                  <Label htmlFor={field.name}>Телефон</Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете телефон'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name='contactEmail'
              validators={{
                onChange: ({ value }) => {
                  if (!value)
                    return 'Имейлът на лицето за контакт е задължителен'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Невалиден имейл адрес'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
                  <Label htmlFor={field.name}>Електронна поща</Label>
                  <Input
                    id={field.name}
                    type='email'
                    placeholder='Въведете имейл'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <form.Subscribe
          selector={(state) => {
            const step2Fields = [
              state.fieldMeta.managerFullName,
              state.fieldMeta.managerPosition,
              state.fieldMeta.contactFullName,
              state.fieldMeta.contactPosition,
              state.fieldMeta.contactPhone,
              state.fieldMeta.contactEmail,
            ]

            const hasErrors = step2Fields.some(
              (field) => field?.errors && field.errors.length > 0
            )

            const allTouched = step2Fields.every((field) => field?.isTouched)

            return !hasErrors && allTouched
          }}
        >
          {(canProceed) => (
            <Button onClick={nextStep} disabled={!canProceed}>
              Напред
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )

  // Step 3
  const renderStep3 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Описание на свободното място
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 lg:grid-cols-6 gap-8 '>
        <form.Field
          name='jobPosition'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Длъжността е задължителна' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Длъжност</Label>
              <Input
                id={field.name}
                placeholder='Въведете длъжност'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='requiredWorkers'
          validators={{
            onChange: ({ value }) => {
              const numValue = Number(value)
              if (isNaN(numValue)) return 'Моля, въведете число'
              if (numValue < 1) return 'Необходим е поне един работник'
              return undefined
            },
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Необходим брой работници</Label>
              <Input
                id={field.name}
                type='number'
                min='1'
                placeholder='Въведете брой'
                value={field.state.value.toString()}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='responsibilities'
          validators={{
            onChange: ({ value }) =>
              !value
                ? 'Функционалните отговорности са задължителни'
                : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3 row-span-2'>
              <Label htmlFor={field.name}>Функционални отговорности</Label>
              <Textarea
                id={field.name}
                placeholder='Опишете функционалните отговорности'
                className='min-h-max h-full'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='employmentType'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Типът на наемане е задължителен' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Наемане на работа</Label>
              <Input
                id={field.name}
                placeholder='Въведете тип наемане (пълно/непълно работно време)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='schedule'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Графикът е задължителен' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>График</Label>
              <Input
                id={field.name}
                placeholder='Въведете график (дни/часове)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className='grid grid-cols-1 md:grid-cols-6 gap-8 col-span-full'>
          <form.Field
            name='grossMonthlyIncome'
            validators={{
              onChange: ({ value }) =>
                !value ? 'Месечният доход е задължителен' : undefined,
            }}
          >
            {(field) => (
              <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
                <Label htmlFor={field.name}>Месечен доход (брутен)</Label>
                <Input
                  id={field.name}
                  placeholder='Въведете брутен доход'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field
            name='taxDeductions'
            validators={{
              onChange: ({ value }) =>
                !value ? 'Данъчните удръжки са задължителни' : undefined,
            }}
          >
            {(field) => (
              <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
                <Label htmlFor={field.name}>Данъчни удръжки</Label>
                <Input
                  id={field.name}
                  placeholder='Въведете данъчни удръжки'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field
            name='netSalary'
            validators={{
              onChange: ({ value }) =>
                !value ? 'Нетната заплата е задължителна' : undefined,
            }}
          >
            {(field) => (
              <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
                <Label htmlFor={field.name}>Ниво на заплата (нето)</Label>
                <Input
                  id={field.name}
                  placeholder='Въведете нетна заплата'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name='bonuses'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Бонуси (ако има)</Label>
              <Input
                id={field.name}
                placeholder='Въведете бонуси'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='probationPeriod'
          validators={{
            onChange: ({ value }) =>
              !value
                ? 'Продължителността на изпитателния срок е задължителна'
                : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>
                Продължителност на изпитателния срок
              </Label>
              <Input
                id={field.name}
                placeholder='Въведете продължителност'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <form.Subscribe
          selector={(state) => {
            const step3Fields = [
              state.fieldMeta.jobPosition,
              state.fieldMeta.requiredWorkers,
              state.fieldMeta.responsibilities,
              state.fieldMeta.employmentType,
              state.fieldMeta.schedule,
              state.fieldMeta.grossMonthlyIncome,
              state.fieldMeta.taxDeductions,
              state.fieldMeta.netSalary,
              state.fieldMeta.probationPeriod,
            ]

            const hasErrors = step3Fields.some(
              (field) => field?.errors && field.errors.length > 0
            )

            const allTouched = step3Fields.every((field) => field?.isTouched)

            return !hasErrors && allTouched
          }}
        >
          {(canProceed) => (
            <Button onClick={nextStep} disabled={!canProceed}>
              Напред
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )

  // Step 4
  const renderStep4 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Изисквания към кандидата
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 lg:grid-cols-6 gap-8 '>
        <form.Field name='candidateRequirements.genderAgeMaritalStatus'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>
                Пол, възраст, семейно положение
              </Label>
              <Input
                id={field.name}
                placeholder='Въведете изисквания (ако има)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='candidateRequirements.education'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Образованието е задължително' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Образование</Label>
              <Input
                id={field.name}
                placeholder='Въведете изисквания за образование'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='candidateRequirements.experience'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Опитът е задължителен' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Опит</Label>
              <Input
                id={field.name}
                placeholder='Въведете изисквания за опит'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='candidateRequirements.personalQualities'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Личностните качества са задължителни' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3 row-span-2'>
              <Label htmlFor={field.name}>Личностни качества</Label>
              <Textarea
                id={field.name}
                placeholder='Въведете изисквания за личностни качества'
                className='min-h-max h-full'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='candidateRequirements.healthRequirements'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Здравни изисквания</Label>
              <Input
                id={field.name}
                placeholder='Въведете здравни изисквания (ако има)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <form.Subscribe
          selector={(state) => {
            const candidateReqs = state.fieldMeta
            if (!candidateReqs) return false

            // Only these fields are required according to your schema
            const requiredFields = [
              candidateReqs['candidateRequirements.education'],
              candidateReqs['candidateRequirements.experience'],
              candidateReqs['candidateRequirements.personalQualities'],
            ]

            // Check that all required fields are touched and have no errors
            const hasErrors = requiredFields.some(
              (field) => field?.errors && field.errors.length > 0
            )

            const allTouched = requiredFields.every((field) => field?.isTouched)

            return !hasErrors && allTouched
          }}
        >
          {(canProceed) => (
            <Button onClick={nextStep} disabled={!canProceed}>
              Напред
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )

  // Step 5
  const renderStep5 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Социален пакет от работодателя
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 md:grid-cols-6 gap-8'>
        <form.Field name='socialPackage.visaCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Разходи за виза</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация за разходите'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.transportCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Транспортни разходи</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация за разходите'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.airportTransfer'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Трансфер от летището</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (да/не)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.workPermitAssistance'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>
                Съдействие за разрешително за работа
              </Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (цена, кой плаща)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.accommodationCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Разходи за настаняване</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (цена, кой плаща)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.foodCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Разходи за храна</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (цена, кой плаща)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.trainingCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Разходи за обучение</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.commuteCosts'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-2'>
              <Label htmlFor={field.name}>Разходи за пътуване до работа</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (цена, кой плаща)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.healthInsurance'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Здравна застраховка</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (цена, кой плаща)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name='socialPackage.otherInsurance'>
          {(field) => (
            <div className='flex flex-col gap-4 col-span-full lg:col-span-3'>
              <Label htmlFor={field.name}>Други застраховки</Label>
              <Input
                id={field.name}
                placeholder='Въведете информация (ако има)'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={nextStep}>Напред</Button>
      </CardFooter>
    </Card>
  )

  // Step 6
  const renderStep6 = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='mx-auto headline-h6 my-8'>
          Финални детайли
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <form.Field
          name='languageSkills'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Владеенето на езици е задължително' : undefined,
          }}
        >
          {(field) => (
            <div className='flex flex-col gap-4'>
              <Label htmlFor={field.name} className='text-sm font-medium'>
                Владеене на езици
              </Label>
              <Textarea
                id={field.name}
                placeholder='Опишете изискванията за владеене на езици'
                className='min-h-[100px]'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className='border-t border-input pt-6'>
          <h3 className='text-lg font-medium mb-4'>Подпис</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <form.Field
              name='signatoryPosition'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Длъжността е задължителна' : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4'>
                  <Label htmlFor={field.name} className='text-sm font-medium'>
                    Длъжност
                  </Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете длъжност'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name='signatoryFullName'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Пълното име е задължително' : undefined,
              }}
            >
              {(field) => (
                <div className='flex flex-col gap-4'>
                  <Label htmlFor={field.name} className='text-sm font-medium'>
                    Пълно име (подпис)
                  </Label>
                  <Input
                    id={field.name}
                    placeholder='Въведете пълно име'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <form.Subscribe
          selector={(state) => {
            const step6Fields = [
              state.fieldMeta.languageSkills,
              state.fieldMeta.signatoryPosition,
              state.fieldMeta.signatoryFullName,
            ]

            const hasErrors = step6Fields.some(
              (field) => field?.errors && field.errors.length > 0
            )

            const allTouched = step6Fields.every((field) => field?.isTouched)

            return !hasErrors && allTouched && state.canSubmit
          }}
        >
          {(canSubmit) => (
            <Button onClick={() => form.handleSubmit()} disabled={!canSubmit}>
              Изпрати
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )

  // Sucess card
  const renderSuccess = () => (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-center text-green-600'>
          Успешно изпратено!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-center mb-6'>
          <p className='mb-4'>
            Вашата форма беше успешно изпратена и записана.
          </p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className='container mx-auto  px-4'>
      <h1 className='headline-h2 font-bold mb-16 text-center'>
        Форма за кандидатстване
      </h1>

      {formData ? (
        renderSuccess()
      ) : (
        <>
          <div className='mb-10 hidden lg:block'>
            {/* Progress bar with icons */}
            <div className='relative mb-8 max-w-[80%] mx-auto'>
              {/* Base progress line (background) */}
              <div
                className='absolute top-5 left-0 right-0 h-1 bg-muted'
                style={{
                  left: '20px',
                  right: '20px',
                }}
              ></div>

              {/* Active progress line */}
              <div
                className='absolute top-5 h-1 bg-primary transition-all duration-300'
                style={{
                  left: '20px',
                  width:
                    currentStep === 1
                      ? 0
                      : `calc(${((currentStep - 1) / 5) * 100}% - 55px)`,
                }}
              ></div>

              {/* Step icons */}
              <div className='relative flex justify-between'>
                {[
                  { step: 1, icon: <Building size={20} />, label: 'Клиент' },
                  { step: 2, icon: <Users size={20} />, label: 'Контакти' },
                  { step: 3, icon: <Briefcase size={20} />, label: 'Позиция' },
                  {
                    step: 4,
                    icon: <UserCheck size={20} />,
                    label: 'Изисквания',
                  },
                  {
                    step: 5,
                    icon: <BookUp2 size={20} />,
                    label: 'Социален пакет',
                  },
                  {
                    step: 6,
                    icon: <Languages size={20} />,
                    label: 'Финални детайли',
                  },
                ].map(({ step, icon, label }) => (
                  <div key={step} className='flex flex-col items-center'>
                    <div className='bg-secondary px-4  z-10 relative'>
                      <div
                        className={`w-10 h-10 rounded-full border border-input flex items-center justify-center ${
                          currentStep >= step
                            ? 'bg-secondary-700 text-foreground'
                            : 'bg-background text-muted-foreground'
                        }`}
                      >
                        {icon}
                      </div>
                    </div>
                    <span className='body-12-regular text-muted-foreground mt-2'>
                      Стъпка {step}
                    </span>
                    <span className='text-xs mt-2'>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mb-10  lg:hidden block'>
            {/* Progress bar with icons */}
            <div className='relative mb-8 mx-auto max-w-full md:max-w-[80%]'>
              {/* Base progress line (background) - hidden on mobile, visible on larger screens */}
              <div
                className='absolute top-5 left-0 right-0 h-1 bg-muted hidden md:block'
                style={{
                  left: '20px',
                  right: '20px',
                }}
              ></div>

              {/* Active progress line - hidden on mobile, visible on larger screens */}
              <div
                className='absolute top-5 h-1 bg-primary transition-all duration-300 hidden md:block'
                style={{
                  left: '20px',
                  width:
                    currentStep === 1
                      ? 0
                      : `calc(${((currentStep - 1) / 5) * 100}% - 55px)`,
                }}
              ></div>

              {/* Step icons */}
              <div className='relative flex flex-wrap md:flex-nowrap justify-between'>
                {/* Mobile indicator - only visible on small screens */}
                <div className='w-full text-center mb-4 md:hidden'>
                  <span className='text-sm font-medium'>
                    Стъпка {currentStep} от 6
                  </span>
                </div>

                {[
                  { step: 1, icon: <Building size={20} />, label: 'Клиент' },
                  { step: 2, icon: <Users size={20} />, label: 'Контакти' },
                  { step: 3, icon: <Briefcase size={20} />, label: 'Позиция' },
                  {
                    step: 4,
                    icon: <UserCheck size={20} />,
                    label: 'Изисквания',
                  },
                  {
                    step: 5,
                    icon: <BookUp2 size={20} />,
                    label: 'Социален пакет',
                  },
                  {
                    step: 6,
                    icon: <Languages size={20} />,
                    label: 'Финални детайли',
                  },
                ].map(({ step, icon, label }) => (
                  <div
                    key={step}
                    className={`flex flex-col items-center ${
                      // On mobile, only show current step and adjacent steps
                      step < currentStep - 1 || step > currentStep + 1
                        ? 'hidden md:flex'
                        : 'flex'
                    } ${
                      // Adjust spacing on mobile
                      step === currentStep ? 'mx-4 md:mx-0' : 'mx-1 md:mx-0'
                    }`}
                  >
                    <div className='bg-secondary px-2 md:px-4 z-10 relative'>
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-input flex items-center justify-center ${
                          currentStep >= step
                            ? 'bg-secondary-700 text-foreground'
                            : 'bg-background text-muted-foreground'
                        } ${currentStep === step ? 'scale-110' : ''}`}
                      >
                        {icon}
                      </div>
                    </div>
                    <span className='body-12-regular text-muted-foreground mt-2 text-[10px] md:text-xs'>
                      {step === currentStep ? `Стъпка ${step}` : ''}
                    </span>
                    <span
                      className={`text-[10px] md:text-xs mt-1 ${
                        step === currentStep
                          ? 'font-medium'
                          : 'hidden md:inline-block'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile progress bar */}
              <div className='w-full mt-4 bg-muted h-1 rounded-full md:hidden'>
                <div
                  className='bg-primary h-1 rounded-full transition-all duration-300'
                  style={{
                    width: `${((currentStep - 1) / 5) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </>
      )}
    </div>
  )
}
