import Select, { IOption } from '../../UI/components/Select';

const languages: IOption[] = [
  { value: 'english', label: 'English' },
  { value: 'russian', label: 'Русский' },
  { value: 'english', label: 'English' },
];

const Languages = () => {
  return (
    <Select
      classes="languages"
      options={languages}
      onChange={(value) => console.log(value)}
    />
  );
};

export default Languages;
