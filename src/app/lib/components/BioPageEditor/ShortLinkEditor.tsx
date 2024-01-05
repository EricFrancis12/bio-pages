'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShortLinkEditor(props: {
    value: string,
    onValueChange: Function
}) {
    const { value: bioPage_id, onValueChange } = props;

    const { push } = useRouter();

    const [inputValue, setInputValue] = useState<string>(bioPage_id);
    const [loading, setLoading] = useState(false);

    async function handleButtonClick() {
        if (inputValue === bioPage_id) return;

        setLoading(true);
        const newBioPage_id = inputValue;
        const resJson = await fetch(`/api/bio-pages/${bioPage_id}/change_id`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                _id: newBioPage_id
            })
        })
            .then((res) => res.json())
            .catch((err) => console.error(err));

        if (resJson.success === true) {
            onValueChange(newBioPage_id);
            push(`/dashboard/bio-pages/${newBioPage_id}/edit`);
        } else {
            console.log('Change bioPage_id was unsuccessful. Handler not yet implimented.');
        }
        setLoading(false);
    }

    return (
        <div>
            <div>
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
            </div>
            <div>
                {!loading &&
                    <button
                        disabled={inputValue === bioPage_id}
                        onClick={e => handleButtonClick()}
                    >
                        Submit
                    </button>
                }
            </div>
        </div>
    )
}
