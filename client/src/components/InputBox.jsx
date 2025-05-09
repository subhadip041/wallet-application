
export const InputBox = ({label, placeholder, onChange, type, name, value}) => {
    return (
    <div>
      <div className="text-sm sm:font-medium text-left py-2">
        {label}
      </div>
      <input  onChange={onChange} placeholder={placeholder} type={type} name={name}  value={value} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    )
}