import { useState } from 'react';
import SwitchRadio from '../components/SwitchRadio';

export default function Organizations() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value);
    };

    return (
        <div className="section">
            <div className="box">
                <h1 className="title">Organizations</h1>
                <div className="radios">
                    <SwitchRadio
                        label="Going"
                        name="rsvp"
                        value="going"
                        checked={selectedValue === 'going'}
                        onChange={handleChange}
                    />
                    <SwitchRadio
                        label="Not going"
                        name="rsvp"
                        value="not-going"
                        checked={selectedValue === 'not-going'}
                        onChange={handleChange}
                    />
                    <SwitchRadio
                        label="Maybe"
                        name="rsvp"
                        value="maybe"
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    );
}