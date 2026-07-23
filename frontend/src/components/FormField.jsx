import SliderField  from './SliderField';
import StepperField from './StepperField';
import ToggleField  from './ToggleField';
import SelectField  from './SelectField';

const FIELD_COMPONENTS = {
  slider:  SliderField,
  stepper: StepperField,
  toggle:  ToggleField,
  select:  SelectField,
};

const FormField = ({ field, value, onChange }) => {
  const Component = FIELD_COMPONENTS[field.type];
  if (!Component) return null;
  return <Component field={field} value={value} onChange={onChange} />;
};

export default FormField;
