//package com.fs.client.repository
//
//import com.fs.client.repository.blocked.PositionBlockingRepository
//import com.fs.client.service.PositionModelConverter
//import com.fs.domain.jooq.tables.Position.Companion.POSITION
//import com.fs.domain.jooq.tables.pojos.Position
//import com.fs.domain.jooq.tables.records.CompaniesPositionsRecord
//import com.fs.domain.jooq.tables.records.PositionRecord
//import com.fs.domain.jooq.tables.references.COMPANIES_POSITIONS
//import com.fs.service.ru.PositionModel
//import org.jooq.DSLContext
//import reactor.core.publisher.Flux
//import reactor.core.publisher.Mono
//
//abstract class PositionRepository(
//    open val dsl: DSLContext,
//    open val converter: PositionModelConverter,
//    open val positionBlockingRepository: PositionBlockingRepository
//) {
//
//    fun getPositionById(id: Long): Mono<PositionModel> {
//        return Mono.fromSupplier {
//            positionBlockingRepository.getById(id)
//        }
//    }
//
//    fun getAllPositionsByCompanyId(companyId: Long): Flux<PositionModel> {
//        return Flux.from(
//            dsl.select(POSITION.asterisk()).from(POSITION)
//                .where(
//                    POSITION.ID.`in`(
//                        dsl.select(COMPANIES_POSITIONS.POSITION_ID).from(COMPANIES_POSITIONS)
//                            .where(COMPANIES_POSITIONS.COMPANY_ID.eq(companyId))
//                    )
//                )
//
//        ).map { it.into(Position::class.java) }
//            .map(converter::toModel)
//    }
//
//    fun getAllPositions(): Flux<PositionModel> {
//        return Flux.from(
//            dsl.select(POSITION.asterisk()).from(POSITION)
//        ).map { it.into(Position::class.java) }
//            .map(converter::toModel)
//    }
//
//    fun insertPosition(positionModel: PositionModel): Mono<PositionModel> {
//        return Mono.fromSupplier {
//            val newPositionRecord: PositionRecord = dsl.newRecord(POSITION)
//            newPositionRecord.from(positionModel)
//            newPositionRecord.reset(POSITION.ID)
//            newPositionRecord.store()
//            return@fromSupplier newPositionRecord.into(Position::class.java)
//        }
//            .map(converter::toModel)
//    }
//
//    fun initCompanyPosition(companyId: Long, positionModel: PositionModel): Mono<PositionModel> {
//        return Mono.fromSupplier {
//            val newPositionRecord: PositionRecord = dsl.newRecord(POSITION)
//            newPositionRecord.from(positionModel)
//            newPositionRecord.reset(POSITION.ID)
//            newPositionRecord.store()
//
//            val newCompaniesPositionsRecord: CompaniesPositionsRecord = dsl.newRecord(COMPANIES_POSITIONS)
//            newCompaniesPositionsRecord.positionId = newPositionRecord.id
//            newCompaniesPositionsRecord.companyId = companyId
//            dsl.insertInto(COMPANIES_POSITIONS)
//                .set(newCompaniesPositionsRecord)
//                .execute()
//
//            return@fromSupplier newPositionRecord.into(Position::class.java)
//        }
//            .map(converter::toModel)
//    }
//
//    fun initExistingPositionToCompany(companyId: Long, positionId: Long): Mono<Boolean> {
//        return Mono.fromSupplier {
//            val newCompaniesPositionsRecord: CompaniesPositionsRecord = dsl.newRecord(COMPANIES_POSITIONS)
//            newCompaniesPositionsRecord.positionId = positionId
//            newCompaniesPositionsRecord.companyId = companyId
//            dsl.insertInto(COMPANIES_POSITIONS)
//                .set(newCompaniesPositionsRecord)
//                .execute() == 1
//        }
//    }
//
//    fun updatePosition(position: PositionModel): Mono<Boolean> {
//        return Mono.fromSupplier {
//            val oldPosition = positionBlockingRepository.getById(position.id!!)
//
//            dsl.update(POSITION)
//                .set(POSITION.DESCRIPTION, position.description ?: oldPosition?.description)
//                .set(POSITION.NAME, position.name ?: oldPosition?.name)
//                .where(POSITION.ID.eq(position.id))
//                .execute() == 1
//        }
//    }
//
//    fun deletePosition(positionId: Long): Mono<Boolean> {
//        return Mono.fromSupplier {
//            dsl.deleteFrom(COMPANIES_POSITIONS)
//                .where(COMPANIES_POSITIONS.POSITION_ID.eq(positionId))
//                .execute()
//            dsl.deleteFrom(POSITION)
//                .where(POSITION.ID.eq(positionId))
//                .execute() == 1
//
//        }
//    }
//}