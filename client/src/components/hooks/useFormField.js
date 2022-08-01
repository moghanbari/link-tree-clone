import { useState } from 'react'

const useFormField = (initialValue) => {
	const [formData, setFormData] = useState(initialValue);

	return [{
		onChange: (e) => setFormData(e.target.value),
		value: formData
	}]
}

export default useFormField;
