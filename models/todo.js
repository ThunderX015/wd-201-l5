"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const od = await Todo.overdue();
      var mapper = od.map((oditem) => oditem.displayableString());
      console.log(mapper.join("\n"));
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dt = await Todo.dueToday();
      var mapper = dt.map((dtitem) => dtitem.displayableString());
      console.log(mapper.join("\n"));
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dl = await Todo.dueLater();
      var mapper = dl.map((dlitem) => dlitem.displayableString());
      console.log(mapper.join("\n"));
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      var findItems = Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
            completed: false,
          },
        },
        order: [["id", "ASC"]],
      });
      return findItems;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      var findItems = Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
      return findItems;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      var findItems = Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
      return findItems;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return Todo.update(
        {
          completed: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
