import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useRules } from '../../contexts/RulesContext';
import { IRule } from '../../models/IMorphologicalRules';

interface IGroupProps {
    features: {
        id: string;
        name: string;
        values: {
            [key: string]: {
                id: string;
                name: string;
            };
        };
    }[];
    part: string;
    rule: IRule;
}

const TextAreaComponent = ({
    part,
    ruleId,
    prop,
    value,
}: {
    part: string;
    ruleId: string;
    prop: string;
    value: string;
}) => {
    const { setProp } = useRules();
    const [inputValue, setInputValue] = useState(value);
    return (
        <Form.Control
            value={inputValue}
            as='textarea'
            rows={1}
            onChange={(e) => {
                setInputValue(e.target.value);
            }}
            onBlur={() => {
                setProp(part, ruleId, prop, inputValue || null);
            }}
        />
    );
};

export const RulesGroup = ({ features, rule, part }: IGroupProps) => {
    const valueIdArr = rule.features.map((features) => features.id);
    return (
        <Row className='align-values-center mb-1'>
            {features.map((feature) => {
                return (
                    <Col key={feature.id} className='d-flex justify-content-center'>
                        {feature.values[valueIdArr.find((valueId) => feature.values[valueId]) || '']?.name || '-'}
                    </Col>
                );
            })}

            {Object.keys(rule)
                .filter((key) => key !== 'features' && key !== 'id')
                .map((prop) => {
                    return (
                        <Col key={prop} className='d-flex justify-content-center'>
                            <TextAreaComponent
                                part={part}
                                ruleId={rule.id}
                                prop={prop}
                                value={rule[prop as Exclude<keyof IRule, 'features'>] || ''}
                            />
                        </Col>
                    );
                })}
        </Row>
    );
};
