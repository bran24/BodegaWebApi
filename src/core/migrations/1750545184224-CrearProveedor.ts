import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearProveedor1750545184224 implements MigrationInterface {
    name = 'CrearProveedor1750545184224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE \`tipoPermisos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permisos\` ADD CONSTRAINT \`FK_cd6301cba6385d9f6e830513635\` FOREIGN KEY (\`tipoPermisoid\`) REFERENCES \`tipoPermisos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisos\` DROP FOREIGN KEY \`FK_cd6301cba6385d9f6e830513635\``);
        // await queryRunner.query(`DROP TABLE \`tipoPermisos\``);
    }

}
