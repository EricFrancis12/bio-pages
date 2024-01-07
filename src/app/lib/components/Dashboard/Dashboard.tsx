import type { BioPage } from '../../types';

export default function Dashboard({ bioPages }: { bioPages: BioPage[] }) {
    return (
        <div>
            <div>
                <h1>
                    Dashboard
                </h1>
            </div>
            <div>
                {bioPages.map((bioPage, index) => (
                    <div key={index}>
                        Example bioPage
                    </div>
                ))}
            </div>
        </div>
    )
}
