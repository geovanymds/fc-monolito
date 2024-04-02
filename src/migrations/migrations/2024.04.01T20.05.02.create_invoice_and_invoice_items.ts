import { DataTypes, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {

    await sequelize.getQueryInterface().createTable('invoices', {
        id: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        document: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        street: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
          complement: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        zip_code: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
      });

      await sequelize.getQueryInterface().createTable('invoices_items', {
        id: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        price: {
          type: DataTypes.NUMBER,
          allowNull: false
        },
        invoice_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
          references: { model: 'invoices', key: 'id' }
        }
      });

};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('invoices_items');
    await sequelize.getQueryInterface().dropTable('invoices');
};
