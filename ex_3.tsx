export interface IDependency {
    id: string;
    is_dependent: boolean;
    relative_feature: { id: string };
    relative_value: { id: string };
    feature: { id: string };
    value: { id: string };
}

export interface IMorphologicalDependenciesPartOfSpeech {
    pos: {
        names_hash: string;
        name: string;
        hash: string;
        id: string;
        features: {
            [key: string]: {
                id: string;
                name: string;
                values: {
                    [key: string]: { id: string; name: string; is_salient: boolean };
                };
            };
        };
    };
    id: string;
    hash: string;
    dependencies: IDependency[];
}
