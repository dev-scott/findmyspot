import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import { IconSearch } from '@tabler/icons-react'
type AutocompleteSimplifiedProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  'renderInput'
> & {
  placeholder?: string
}

export const Autocomplete = <T,>({
  placeholder = 'Search...',
  ...props
}: AutocompleteSimplifiedProps<T>) => {
  return (
    <MuiAutocomplete
      autoSelect
      handleHomeEndKeys
      classes={{
        root: 'font-sans',
        input: 'py-2 px-3 text-sm font-medium',
        noOptions: 'bg-black/90 backdrop-blur-xl text-white/60 text-xs py-4 px-6 uppercase tracking-widest',
        loading: 'bg-black/90 backdrop-blur-xl text-white/60 text-xs py-4 px-6 uppercase tracking-widest',
        listbox: 'p-2 bg-black/90 backdrop-blur-xl text-white max-h-64 space-y-1',
        option: 'text-xs uppercase tracking-widest font-bold py-3 px-4 hover:bg-primary hover:text-black transition-colors duration-200 rounded-none',
        paper: 'shadow-2xl border border-white/10 mt-2 bg-transparent rounded-none',
      }}
      renderInput={(params) => (
        <div
          ref={params.InputProps.ref}
          className="flex items-center relative group"
        >
          <input
            type="text"
            {...params.inputProps}
            className="w-full py-3 pl-4 pr-12 text-xs font-bold uppercase tracking-widest bg-white/90 backdrop-blur-xl border border-white/20 focus:border-primary focus:ring-0 transition-all duration-300 placeholder:text-black/30 shadow-xl"
            placeholder={placeholder}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-primary">
            <IconSearch className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      )}
      {...props}
    />
  )
}
