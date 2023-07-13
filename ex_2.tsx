export interface IRule {
    id: string;
    wordForm: string;
    lemma: string;
    lemmaRules: string;
    prefixRules: string;
    suffixRules: string;
    otherRules: string;
    exceptionRules: string;
    features: { id: string }[];
}

export type OmitFeatures = Omit<IRule, 'features'>;

export interface IMorphologicalRulesPartOfSpeech {
    total: number;
    id: string;
    pos: {
        name: string;
        features: {
            [key: string]: {
                id: string;
                name: string;
                values: { [key: string]: { id: string; name: string } };
            };
        };
    };
    rules: IRule[];
}
