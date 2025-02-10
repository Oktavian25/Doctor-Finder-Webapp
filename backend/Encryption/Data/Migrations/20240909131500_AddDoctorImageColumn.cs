using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDoctorImageColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Clinics_clinicId",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specializations_specializationId",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "specializationId",
                table: "Doctors",
                newName: "SpecializationId");

            migrationBuilder.RenameColumn(
                name: "clinicId",
                table: "Doctors",
                newName: "ClinicId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_specializationId",
                table: "Doctors",
                newName: "IX_Doctors_SpecializationId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_clinicId",
                table: "Doctors",
                newName: "IX_Doctors_ClinicId");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Clinics_ClinicId",
                table: "Doctors",
                column: "ClinicId",
                principalTable: "Clinics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specializations_SpecializationId",
                table: "Doctors",
                column: "SpecializationId",
                principalTable: "Specializations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Clinics_ClinicId",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specializations_SpecializationId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "SpecializationId",
                table: "Doctors",
                newName: "specializationId");

            migrationBuilder.RenameColumn(
                name: "ClinicId",
                table: "Doctors",
                newName: "clinicId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_SpecializationId",
                table: "Doctors",
                newName: "IX_Doctors_specializationId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_ClinicId",
                table: "Doctors",
                newName: "IX_Doctors_clinicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Clinics_clinicId",
                table: "Doctors",
                column: "clinicId",
                principalTable: "Clinics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specializations_specializationId",
                table: "Doctors",
                column: "specializationId",
                principalTable: "Specializations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
