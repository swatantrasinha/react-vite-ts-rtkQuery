import {STAT_HP, STAT_ATTACK, STAT_DEFENSE, STAT_SPEED, STAT_SPECIAL_ATTACK, STAT_SPECIAL_DEFENSE} from '../constants/filterTypes';

export const enum StatEnum {
    STAT_RANGE_HP = STAT_HP,
    STAT_RANGE_ATTACK = STAT_ATTACK,
    STAT_RANGE_DEFENSE =STAT_DEFENSE,
    STAT_RANGE_SPEED =STAT_SPEED,
    STAT_RANGE_SPECIAL_ATTACK =STAT_SPECIAL_ATTACK,
    STAT_RANGE_SPECIAL_DEFENSE =STAT_SPECIAL_DEFENSE,
  }

export type STAT_RANGE= {
    [StatEnum.STAT_RANGE_HP]: {minValue:number, maxValue:number};
    [StatEnum.STAT_RANGE_ATTACK]: {minValue:number, maxValue:number};
    [StatEnum.STAT_RANGE_DEFENSE]: {minValue:number, maxValue:number};
    [StatEnum.STAT_RANGE_SPEED]: {minValue:number, maxValue:number};
    [StatEnum.STAT_RANGE_SPECIAL_ATTACK]: {minValue:number, maxValue:number};
    [StatEnum.STAT_RANGE_SPECIAL_DEFENSE]: {minValue:number, maxValue:number};
};