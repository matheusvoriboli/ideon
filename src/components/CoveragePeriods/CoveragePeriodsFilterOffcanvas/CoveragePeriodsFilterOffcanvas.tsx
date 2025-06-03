import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button, Dropdown, Offcanvas, RadioButton, Tabs } from '~/index'
import { type CoveragePeriodsFiltersForm, DistributionFormat } from '~/utils'

const CoveragePeriodsFilterOffcanvas = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
  onReset,
}: {
  isOpen: boolean
  onClose: () => void
  methods: UseFormReturn<CoveragePeriodsFiltersForm>
  onSubmit: (data: CoveragePeriodsFiltersForm) => void
  onReset: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'filter' | 'saved-filters'>(
    'filter'
  )

  const { register, watch, setValue, handleSubmit } = methods

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Offcanvas isOpen={isOpen} onClose={onClose}>
      <div className="mb-6">
        <Tabs
          tabs={[
            { id: 'filter', label: 'Filter' },
            { id: 'saved-filters', label: 'Saved Filters' },
          ]}
          onChange={tabId => {
            setActiveTab(tabId as 'filter' | 'saved-filters')
          }}
        />
      </div>
      {activeTab === 'filter' ? (
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4 flex-1 overflow-y-auto">
            <Dropdown
              label="Organization Name"
              value={watch('organization')}
              options={[
                { label: 'Amazon', value: 'amazon' },
                { label: 'Middo', value: 'middo' },
                { label: 'Demo Group 1', value: 'demo-group-1' },
                {
                  label: 'Product Release Webinar Company',
                  value: 'product-release',
                },
                { label: 'Puma', value: 'puma' },
              ]}
              onChange={value => setValue('organization', value as string[])}
              multiple
              searchable
            />

            <Dropdown
              label="Group"
              value={watch('group')}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => setValue('group', value as string)}
            />

            <div className="flex flex-col mb-2">
              <label className="text-sm font-semibold">
                Distribution Format
              </label>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <RadioButton
                  name="distribution-format"
                  value="Edi"
                  checked={
                    watch('distributionFormat') === DistributionFormat.Edi
                  }
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
                  checked={
                    watch('distributionFormat') === DistributionFormat.Api
                  }
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
                className="w-full p-2 rounded-lg border border-gray-300"
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
                  setValue(
                    'coverageEndDate.relative',
                    value as 'before' | 'after'
                  )
                }
                className="w-full"
              />
              <input
                type="date"
                {...register('coverageEndDate.date')}
                className="w-full p-2 rounded-lg border border-gray-300"
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
                  setValue(
                    'setupCompletion.relative',
                    value as 'before' | 'after'
                  )
                }
                className="w-full"
              />
              <input
                type="date"
                {...register('setupCompletion.date')}
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>

            <Dropdown
              label="Carrier"
              value={watch('carrier')}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => setValue('carrier', value as string)}
            />

            <Dropdown
              label="State"
              value={watch('state')}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => setValue('state', value as string)}
            />

            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {}}
                className="ml-auto"
              >
                Save Filter
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4 mt-auto absolute bottom-0 left-0 right-0 p-6 border-t border-gray-300">
            <Button variant="outline" className="flex-1" onClick={onReset}>
              Reset
            </Button>
            <Button type="submit" className="flex-1" onClick={() => {}}>
              Apply
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex flex-col mb-2">
              <label className="text-sm font-semibold">Saved Filters</label>
            </div>
          </div>
        </div>
      )}
    </Offcanvas>
  )
}

export default CoveragePeriodsFilterOffcanvas
