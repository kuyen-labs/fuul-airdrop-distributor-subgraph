import { Address, log } from "@graphprotocol/graph-ts";
import { Project } from "../../generated/schema";
import { ProjectCreated__Params } from "../../generated/FuulFactory/FuulFactory";

export function getOrCreateProject(
  projectAddress: Address,
  params: ProjectCreated__Params | null = null
): Project {
  const id = projectAddress.toHexString();
  let project = Project.load(id);

  if (project == null) {
    project = new Project(id);

    if (params) {
      project.airdropId = params.airdropId;
      project.deployedAddress = params.deployedAddress;
      project.merkleRoot = params.merkleRoot;
      project.nativeFeeAmount = params.nativeFeeAmount;
      project.isSignatureRequired = params.isSignatureRequired;
    }
  }

  log.info("New airdrop with id: {}", [project.id.toString()]);

  project.save();

  return project as Project;
}
