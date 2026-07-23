// Central config for all form fields
export const FIELDS = [
  {
    id: 'area',
    label: 'Property Area',
    type: 'slider',
    min: 1000,
    max: 5000,
    step: 50,
    unit: 'sq ft',
    icon: '🏠',
    description: 'Total area of the property in square feet',
  },
  {
    id: 'bedrooms',
    label: 'Bedrooms',
    type: 'stepper',
    min: 1,
    max: 4,
    icon: '🛏️',
    description: 'Number of bedrooms in the property',
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms',
    type: 'stepper',
    min: 1,
    max: 4,
    icon: '🚿',
    description: 'Number of bathrooms in the property',
  },
  {
    id: 'stories',
    label: 'Stories / Floors',
    type: 'stepper',
    min: 1,
    max: 4,
    icon: '🏢',
    description: 'Number of floors in the property',
  },
  {
    id: 'parking',
    label: 'Parking Spaces',
    type: 'stepper',
    min: 0,
    max: 4,
    icon: '🚗',
    description: 'Number of parking spaces available',
  },
  {
    id: 'mainroad',
    label: 'Main Road Access',
    type: 'toggle',
    icon: '🛣️',
    description: 'Is the property connected to the main road?',
  },
  {
    id: 'guestroom',
    label: 'Guest Room',
    type: 'toggle',
    icon: '🛋️',
    description: 'Does the property have a dedicated guest room?',
  },
  {
    id: 'basement',
    label: 'Basement',
    type: 'toggle',
    icon: '🪜',
    description: 'Does the property have a basement?',
  },
  {
    id: 'airconditioning',
    label: 'Air Conditioning',
    type: 'toggle',
    icon: '❄️',
    description: 'Is air conditioning installed?',
  },
  {
    id: 'hotwaterheating',
    label: 'Hot Water Heating',
    type: 'toggle',
    icon: '🔥',
    description: 'Is hot water heating system available?',
  },
  {
    id: 'prefarea',
    label: 'Preferred Area',
    type: 'toggle',
    icon: '⭐',
    description: 'Is the property in a preferred / prime area?',
  },
  {
    id: 'furnishingstatus',
    label: 'Furnishing Status',
    type: 'select',
    icon: '🛏️',
    options: ['unfurnished', 'semi-furnished', 'furnished'],
    description: 'Current furnishing level of the property',
  },
];

export const INITIAL_VALUES = FIELDS.reduce((acc, field) => {
  if (field.type === 'slider') acc[field.id] = '';
  else if (field.type === 'stepper') acc[field.id] = '';
  else if (field.type === 'toggle') acc[field.id] = '';
  else if (field.type === 'select') acc[field.id] = '';
  return acc;
}, {});
