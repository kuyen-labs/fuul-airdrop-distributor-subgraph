import { log } from "@graphprotocol/graph-ts";
import {
  AttributorFeeUpdated as AttributorFeeUpdatedEvent,
  ClientFeeUpdated as ClientFeeUpdatedEvent,
  CurrencyAdded as CurrencyAddedEvent,
  CurrencyRemoved as CurrencyRemovedEvent,
  NftFeeCurrencyUpdated as NftFeeCurrencyUpdatedEvent,
  NftFixedFeeUpdated as NftFixedFeeUpdatedEvent,
  ProjectCooldownUpdated as ProjectCooldownUpdatedEvent,
  ProjectCreated as ProjectCreatedEvent,
  ProjectRemovePeriodUpdated as ProjectRemovePeriodUpdatedEvent,
  ProtocolFeeCollectorUpdated as ProtocolFeeCollectorUpdatedEvent,
  ProtocolFeeUpdated as ProtocolFeeUpdatedEvent,
} from "../../generated/FuulFactory/FuulFactory";
import {
  AttributorFeeUpdated,
  ClientFeeUpdated,
  CurrencyAdded,
  CurrencyRemoved,
  NftFeeCurrencyUpdated,
  NftFixedFeeUpdated,
  ProjectCooldownUpdated,
  ProjectRemovePeriodUpdated,
  ProtocolFeeCollectorUpdated,
  ProtocolFeeUpdated,
} from "../../generated/schema";

import { FuulProject } from "../../generated/templates";
import { getOrCreateProject } from "../entities/project";
import { getOrCreateProjectMember } from "../entities/projectMember";
import { getOrCreateProjectVerifier } from "../entities/projectVerifier";



export function handleProjectCreated(event: ProjectCreatedEvent): void {
  log.info("Creating project with address => {}", [
    event.params.deployedAddress.toHexString(),
  ]);

  const project = getOrCreateProject(
    event.params.deployedAddress,
    event.params
  );
  const projectMember = getOrCreateProjectMember(
    event.transaction.from,
    event.params.deployedAddress);

  const projectVerifier = getOrCreateProjectVerifier(
    event.transaction.from,
    event.params.deployedAddress);

  // Start indexing the new project contract; `event.params.deployedAddress` is the
  // address of the new deployed project contract
  FuulProject.create(event.params.deployedAddress);

  project.save();
  projectMember.save();
  projectVerifier.save();
}

export function handleFeeCollectorUpdated(
  event: FeeCollectorUpdatedEvent
): void {
  let entity = new FeeCollectorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newCollector = event.params.newCollector;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
