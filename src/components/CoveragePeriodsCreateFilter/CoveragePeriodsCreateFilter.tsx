import { UseFormReturn } from 'react-hook-form'
import { Button, Dropdown, RadioButton } from '~/index'
import {
  type CoveragePeriodsFiltersForm,
  DistributionFormat,
  mockData,
  showSuccess,
  defaultCoveragePeriodsFilters,
} from '~/utils'
import { useFiltersStore } from '~/stores'

interface CoveragePeriodsCreateFilterProps {
  methods: UseFormReturn<CoveragePeriodsFiltersForm>
  closeOffcanvas: () => void
}

const CoveragePeriodsCreateFilter: React.FC<
  CoveragePeriodsCreateFilterProps
> = ({ methods, closeOffcanvas }) => {
  const { register, watch, setValue, handleSubmit, reset } = methods
  const { setActiveFilters, resetActiveFilters, startSavingFilter } =
    useFiltersStore()

  const handleFormSubmit = handleSubmit(data => {
    setActiveFilters(data)
    closeOffcanvas()
    showSuccess('Filters applied successfully')
  })

  const handleSaveFilter = () => {
    const currentData = watch()
    startSavingFilter(currentData)
  }

  const handleReset = () => {
    reset(defaultCoveragePeriodsFilters)
    resetActiveFilters()
    showSuccess('Filters reset successfully')
  }

  const getOptions = (key: keyof (typeof mockData)[number]) => {
    return Array.from(new Set(mockData.map(item => item[key]))).map(item => ({
      label: item,
      value: item,
    }))
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex-1">
      <div className="space-y-4 flex-1 overflow-y-auto h-full">
        <Dropdown
          label="Organization Name"
          value={watch('organization') || []}
          options={getOptions('organizationName')}
          onChange={value => setValue('organization', value as string[])}
          multiple
          searchable
        />

        <Dropdown
          label="Group"
          value={watch('group')}
          options={getOptions('group')}
          onChange={value => setValue('group', value as string)}
        />

        <div className="flex flex-col mb-2">
          <label className="text-sm font-semibold text-ideon-dark dark:text-gray-300">
            Distribution Format
          </label>
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex items-center gap-2 w-full">
            <RadioButton
              name="distribution-format"
              value="Edi"
              checked={watch('distributionFormat') === DistributionFormat.Edi}
              onChange={() =>
                setValue('distributionFormat', DistributionFormat.Edi)
              }
              label="Edi"
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <RadioButton
              name="distribution-format"
              value="Api"
              checked={watch('distributionFormat') === DistributionFormat.Api}
              onChange={() =>
                setValue('distributionFormat', DistributionFormat.Api)
              }
              label="Api"
            />
          </div>
        </div>

        <div className="flex gap-2 items-end">
          <Dropdown
            label="Coverage Start Date"
            value={watch('coverageStartDate.relative')}
            options={[
              { label: 'Before', value: 'before' },
              { label: 'After', value: 'after' },
            ]}
            onChange={value =>
              setValue(
                'coverageStartDate.relative',
                value as 'before' | 'after'
              )
            }
            className="w-full"
          />
          <input
            type="date"
            {...register('coverageStartDate.date')}
            className="w-full p-2 rounded-lg border border-ideon-primary-500 dark:border-gray-600 bg-white dark:bg-ideon-dark-100 text-ideon-dark dark:text-gray-300"
          />
        </div>

        <div className="flex gap-2 items-end">
          <Dropdown
            label="Coverage End Date"
            value={watch('coverageEndDate.relative')}
            options={[
              { label: 'Before', value: 'before' },
              { label: 'After', value: 'after' },
            ]}
            onChange={value =>
              setValue('coverageEndDate.relative', value as 'before' | 'after')
            }
            className="w-full"
          />
          <input
            type="date"
            {...register('coverageEndDate.date')}
            className="w-full p-2 rounded-lg border border-ideon-primary-500 dark:border-gray-600 bg-white dark:bg-ideon-dark-100 text-ideon-dark dark:text-gray-300"
          />
        </div>

        <div className="flex gap-2 items-end">
          <Dropdown
            label="Setup Complete At"
            value={watch('setupCompletion.relative')}
            options={[
              { label: 'Before', value: 'before' },
              { label: 'After', value: 'after' },
            ]}
            onChange={value =>
              setValue('setupCompletion.relative', value as 'before' | 'after')
            }
            className="w-full"
          />
          <input
            type="date"
            {...register('setupCompletion.date')}
            className="w-full p-2 rounded-lg border border-ideon-primary-500 dark:border-gray-600 bg-white dark:bg-ideon-dark-100 text-ideon-dark dark:text-gray-300"
          />
        </div>

        <Dropdown
          label="Carrier"
          value={watch('carrier')}
          options={getOptions('carrier')}
          onChange={value => setValue('carrier', value as string)}
        />

        <Dropdown
          label="State"
          value={watch('state')}
          options={getOptions('state')}
          onChange={value => setValue('state', value as string)}
        />

        <div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSaveFilter}
            className="ml-auto"
          >
            Save Filter
          </Button>
        </div>
      </div>

      <div className="flex gap-2 pt-4 mt-auto absolute bottom-0 left-0 right-0 p-6 border-t border-ideon-primary-500 dark:border-gray-600">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleReset}
          type="button"
        >
          Reset
        </Button>
        <Button type="submit" className="flex-1">
          Apply
        </Button>
      </div>
    </form>
  )
}

export default CoveragePeriodsCreateFilter
