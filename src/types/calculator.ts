export type IRates = Record<string, number>;

export type ICurrency = string;

export type IRatio = number;

export type ICalculations = Record<ICurrency, Record<IRatio, number>>;

export interface ICalculate {
    currency: string;
    ratio: number;
    value: number;
}

export interface ISelected {
    currencies: ICurrency[];
    ratios: IRatio[];
}
