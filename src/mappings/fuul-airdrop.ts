import { log, store } from "@graphprotocol/graph-ts";
import {
  FungibleBudgetDeposited as FungibleBudgetDepositedEvent,
  FungibleBudgetRemoved as FungibleBudgetRemovedEvent,
  Attributed as AttributedEvent,
  Claimed as ClaimedEvent,
  AppliedToRemove as AppliedToRemoveEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from "../../generated/templates/FuulProject/FuulProject";
import { getOrCreateUser } from "../entities/user";
import { getOrCreateUserBalance } from "../entities/userBalance";
import { getOrCreateBudget } from "../entities/budget";
import { getOrCreateProject } from "../entities/project";
import { ADMIN_ROLE } from "../constants";
import { getOrCreateProjectMember } from "../entities/projectMember";

export function handleFungibleBudgetDeposited(
  event: TokensDepositedEvent
): void {
  log.info(
    "Handle budget deposited with contract address: {} and currency: {}",
    [event.address.toHexString(), event.params.currency.toHexString()]
  );

  let budget = getOrCreateBudget(event.address, event.params.currency);

  log.info("Updating budget with id: {}", [budget.id.toString()]);
  log.info("Current budget amount: {}", [budget.amount.toString()]);

  budget.amount = budget.amount.plus(event.params.amount);
  budget.currency = event.params.currency;

  budget.save();

  log.info("New budget amount: {}", [budget.amount.toString()]);
}

export function handleBudgetRemoved(
  event: TokensRemovedEvent
): void {
  log.info("Handle budget remove with contract address: {} and currency: {}", [
    event.address.toHexString(),
    event.params.currency.toHexString(),
  ]);

  let budget = getOrCreateBudget(event.address, event.params.currency);

  log.info("Updating budget with id: {}", [budget.id.toString()]);
  log.info("Current budget amount: {}", [budget.amount.toString()]);

  budget.amount = budget.amount.minus(event.params.amount);

  budget.save();

  log.info("New budget amount: {}", [budget.amount.toString()]);
}

export function handleClaimed(event: ClaimedEvent): void {
  let user = getOrCreateUser(event.params.account);
  let userBalance = getOrCreateUserBalance(
    event.params.account,
    event.params.currency,
    event.address
  );

  log.info("User: {} > current claimed: {}", [
    user.id,
    userBalance.claimed.toString(),
  ]);

  userBalance.claimed = userBalance.claimed.plus(event.params.amount);

  user.save();
  userBalance.save();

  log.info("User: {} > new claimed: {}", [
    user.id,
    userBalance.claimed.toString(),
  ]);
}

export function handleNativeFeeUpdated(
  event: NativeFeeAmountUpdated
): void {
  let entity = new NativeFeeAmountUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  const role = event.params.role.toHexString();
  const zeroAddress = ADMIN_ROLE.toString();

  log.info(
    "Handle RoleGranted event for project: {} => For address: {} with Role: {}",
    [event.address.toHexString(), event.params.account.toHexString(), role]
  );

  if (role != zeroAddress) {
    log.info("Role is not ADMIN_ROLE, skipping. Role: {}, ADMIN_ROLE: {}", [
      role,
      zeroAddress,
    ]);
    return;
  }

  let projectMember = getOrCreateProjectMember(
    event.params.account,
    event.address
  );

  projectMember.save();
}


export function handleRoleRevoked(event: RoleRevokedEvent): void {
  const role = event.params.role.toHexString();
  const zeroAddress = ADMIN_ROLE.toString();

  log.info(
    "Handle RoleRevoked event for project: {} => For address: {} with Role: {}",
    [event.address.toHexString(), event.params.account.toHexString(), role]
  );

  if (role != ADMIN_ROLE) {
    log.info("Role is not ADMIN_ROLE, skipping. Role: {}, ADMIN_ROLE: {}", [
      role,
      zeroAddress,
    ]);
    return;
  }

  let projectMember = getOrCreateProjectMember(
    event.params.account,
    event.address
  );

  store.remove("ProjectMember", projectMember.id);
}

