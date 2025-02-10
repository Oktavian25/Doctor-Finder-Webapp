using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class DebugReviewsColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_ReceiverId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_SenderId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ReceiverId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_SenderId",
                table: "Reviews");

            migrationBuilder.AlterColumn<int>(
                name: "SenderId",
                table: "Reviews",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ReceiverId",
                table: "Reviews",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SenderId",
                table: "Reviews",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "ReceiverId",
                table: "Reviews",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReceiverId",
                table: "Reviews",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_SenderId",
                table: "Reviews",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_ReceiverId",
                table: "Reviews",
                column: "ReceiverId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_SenderId",
                table: "Reviews",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
