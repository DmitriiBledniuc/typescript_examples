import React, { useContext, useReducer } from 'react';
import { AnnotationRowInterface, temporaryAnnotation } from '../mocks/TemporatyAnnotationExample.mock';

const AnnotationContext = React.createContext(
    {} as {
        annotation: AnnotationRowInterface[];
        setAnnotation: (index: number, field: keyof AnnotationRowInterface, value: string) => void;
    }
);

const reducer = (
    annotation: AnnotationRowInterface[],
    action: {
        type: string;
        index?: number;
        field?: keyof AnnotationRowInterface;
        value?: string;
    }
) => {
    switch (action.type) {
        case 'setAnnotation':
            let { index, field, value } = action;
            const newannotation = JSON.parse(JSON.stringify(annotation));
            newannotation[index!][field!] = value!;
            return newannotation;
        default:
            return annotation;
    }
};

export const useAnnotation = () => useContext(AnnotationContext);

export const AnnotationProvider = ({ children }: { children: React.ReactNode }) => {
    const [annotation, dispatch] = useReducer(reducer, temporaryAnnotation);

    const setAnnotation = (index: number, field: keyof AnnotationRowInterface, value: string) =>
        dispatch({ type: 'setAnnotation', index, field, value });
    return <AnnotationContext.Provider value={{ annotation, setAnnotation }}>{children}</AnnotationContext.Provider>;
};
