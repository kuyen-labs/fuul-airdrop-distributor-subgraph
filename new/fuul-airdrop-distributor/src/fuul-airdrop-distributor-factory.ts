import {
  AirdropDistributorCreated as AirdropDistributorCreatedEvent,
  FeeCollectorUpdated as FeeCollectorUpdatedEvent,
  NativeFeeAmountUpdated as NativeFeeAmountUpdatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory"
import {
  AirdropDistributorCreated,
  FeeCollectorUpdated,
  NativeFeeAmountUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/schema"

export function handleAirdropDistributorCreated(
  event: AirdropDistributorCreatedEvent
): void {
  let entity = new AirdropDistributorCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contractId = event.params.contractId
  entity.deployedAddress = event.params.deployedAddress
  entity.merkleRoot = event.params.merkleRoot
  entity.nativeFeeAmount = event.params.nativeFeeAmount
  entity.currency = event.params.currency
  entity.verifier = event.params.verifier
  entity.stakingContract = event.params.stakingContract
  entity.claimingWithoutStakingPercentageFee =
    event.params.claimingWithoutStakingPercentageFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeCollectorUpdated(
  event: FeeCollectorUpdatedEvent
): void {
  let entity = new FeeCollectorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeeCollector = event.params.newFeeCollector

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNativeFeeAmountUpdated(
  event: NativeFeeAmountUpdatedEvent
): void {
  let entity = new NativeFeeAmountUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAmount = event.params.newAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
