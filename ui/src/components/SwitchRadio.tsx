interface SwitchRadioProps {
    label: string;
    name: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SwitchRadio({ 
    label, 
    name, 
    value, 
    checked = false, 
    disabled = false, 
    onChange 
}: SwitchRadioProps) {
    return (
        <label className="radio">
            <input 
                type="radio" 
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <span className="radio-slider"></span>
            <span className="radio-label">{label}</span>
        </label>
    );
}