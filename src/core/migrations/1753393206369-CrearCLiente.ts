import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearCLiente1753393206369 implements MigrationInterface {
    name = 'CrearCLiente1753393206369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente\` CHANGE \`tipo_documento\` \`tipo_documento_id\` varchar(10) NULL`);
        await queryRunner.query(`CREATE TABLE \`tipo_documento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_75654a9618f764cc4fdc0bade7\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`tipo_documento_id\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`tipo_documento_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_ff12c8b28762d894e0a4a554d9c\` FOREIGN KEY (\`tipo_documento_id\`) REFERENCES \`tipo_documento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_ff12c8b28762d894e0a4a554d9c\``);
   
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`tipo_documento_id\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`tipo_documento_id\` varchar(10) NULL`);
       
        await queryRunner.query(`DROP INDEX \`IDX_75654a9618f764cc4fdc0bade7\` ON \`tipo_documento\``);
        await queryRunner.query(`DROP TABLE \`tipo_documento\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` CHANGE \`tipo_documento_id\` \`tipo_documento\` varchar(10) NULL`);
    }

}
