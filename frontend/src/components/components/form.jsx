export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="w-[50%] mx-auto mt-[32px] bg-[#FFFFFF] flex flex-col px-[12px] py-[12px] gap-[12px] rounded-md">
      {children}
    </form>
  );
};

export const InputText = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="pl-[12px] py-[8px]"
    />
  );
};
