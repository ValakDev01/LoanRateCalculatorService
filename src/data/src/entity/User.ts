import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    installmentAmount: number;
  
    @Column()
    financingAmount: number;
  
    @Column()
    referenceRate: number;
  
    @Column()
    lastFetchDateResponse: Date;

}
