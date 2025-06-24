import {
  Claimed as ClaimedEvent,
  ClaimingWithoutStakingPercentageFeeUpdated as ClaimingWithoutStakingPercentageFeeUpdatedEvent,
  MerkleRootUpdated as MerkleRootUpdatedEvent,
  MinimumTokenAmountForFeeUpdated as MinimumTokenAmountForFeeUpdatedEvent,
  NativeFeeAmountUpdated as NativeFeeAmountUpdatedEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SignatureVerificationDisabled as SignatureVerificationDisabledEvent,
  SignatureVerificationEnabled as SignatureVerificationEnabledEvent,
  StakingContractUpdated as StakingContractUpdatedEvent,
  TokensRemoved as TokensRemovedEvent,
  Unpaused as UnpausedEvent
} from "../generated/FuulAirdropDistributor/FuulAirdropDistributor"
import {
  Claimed,
  ClaimingWithoutStakingPercentageFeeUpdated,
  MerkleRootUpdated,
  MinimumTokenAmountForFeeUpdated,
  NativeFeeAmountUpdated,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SignatureVerificationDisabled,
  SignatureVerificationEnabled,
  StakingContractUpdated,
  TokensRemoved,
  Unpaused
} from "../generated/schema"

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount
  entity.claimedAmount = event.params.claimedAmount
  entity.season = event.params.season

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimingWithoutStakingPercentageFeeUpdated(
  event: ClaimingWithoutStakingPercentageFeeUpdatedEvent
): void {
  let entity = new ClaimingWithoutStakingPercentageFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMerkleRootUpdated(event: MerkleRootUpdatedEvent): void {
  let entity = new MerkleRootUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.distributorMerkleRoot = event.params.distributorMerkleRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinimumTokenAmountForFeeUpdated(
  event: MinimumTokenAmountForFeeUpdatedEvent
): void {
  let entity = new MinimumTokenAmountForFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAmount = event.params.newAmount

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

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

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

export function handleSignatureVerificationDisabled(
  event: SignatureVerificationDisabledEvent
): void {
  let entity = new SignatureVerificationDisabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSignatureVerificationEnabled(
  event: SignatureVerificationEnabledEvent
): void {
  let entity = new SignatureVerificationEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakingContractUpdated(
  event: StakingContractUpdatedEvent
): void {
  let entity = new StakingContractUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newStakingContract = event.params.newStakingContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let entity = new TokensRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.tokenCurrency = event.params.tokenCurrency

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
