import { SearchForm } from "@/components/form";

const FormPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-black">Form Page</h1>
      <SearchForm />
    </div>
  );
};

export default FormPage;
