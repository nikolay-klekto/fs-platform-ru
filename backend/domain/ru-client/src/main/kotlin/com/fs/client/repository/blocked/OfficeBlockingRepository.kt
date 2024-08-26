package com.fs.client.repository.blocked

import com.fs.client.ru.OfficeModel
import com.fs.client.converter.OfficeModelConverter
import com.fs.domain.jooq.tables.Office.Companion.OFFICE
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Office
import org.jooq.DSLContext

abstract class OfficeBlockingRepository(
    open val dsl: DSLContext,
    open val converter: OfficeModelConverter
) {
    fun getById(officeId: Long): OfficeModel? {
        return dsl.select(OFFICE.asterisk()).from(OFFICE)
            .where(OFFICE.ID.eq(officeId))
            .map { it.into(Office::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun updatePhoneNumberByOfficeId(id: Long, phoneNumber: String?): Boolean {
        val oldOfficeModel: OfficeModel = getById(id) ?: return false
        return dsl.update(OFFICE)
            .set(OFFICE.PHONE_NUMBER, phoneNumber ?: oldOfficeModel.phoneNumber)
            .where(OFFICE.ID.eq(id))
            .execute() == 1
    }

    fun getCompanyIdByOrderId(orderId: Long): Long {
        return dsl.select(OFFICE.COMPANY_ID).from(OFFICE)
            .where(
                OFFICE.ID.eq(
                    dsl.select(ORDER.COMPANY_OFFICE_ID)
                        .from(ORDER)
                        .where(ORDER.ID.eq(orderId))
                )
            ).map { it.into(Long::class.java) }
            .first()
    }
}
