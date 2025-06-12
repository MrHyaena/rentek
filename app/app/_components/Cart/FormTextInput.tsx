//Functional component for creating Cart form inputs
export function FormTextInput({ text, name }: { text: string; name: string }) {
  return (
    <div className="flex flex-col">
      <label className="">{text}</label>
      <input
        required={true}
        name={name}
        type="text"
        className="border border-borderGray p-1 rounded-sm"
      ></input>
    </div>
  );
}
