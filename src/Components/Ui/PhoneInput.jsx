import Input from "./Input";


export default function PhoneInput(props) {
    return (<>
        <Input {...props} float="left" padding="pl-16">
            <div className="absolute flex items-center left-0 inset-y-0">
                <label htmlFor="country" className="absolute w-[1px] h-[1px] p-0 -m-[-1] overflow-hidden text-nowrap border-0 [clip-path:rect(0,0,0,0)]">Country</label>
                <select id="country" name="country" autoComplete="country"
                    className="h-full rounded-md border-0 pr-7 pl-3 py-0 bg-transparent text-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>EG</option>
                    <option className="disabled:text-gray-300 disabled:cursor-not-allowed" disabled>US</option>
                    <option className="disabled:text-gray-300 disabled:cursor-not-allowed" disabled>BR</option>
                </select>
            </div>
        </Input>
    </>)
}
