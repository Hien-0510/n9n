export class CreateProjectDto {
  id: string;
  workflowsID: string[];
  createAt: Date;
  updateAt: Date;
  isDeleted: boolean;
}
