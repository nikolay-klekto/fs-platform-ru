package com.fs.ru.registration.jpa

import javax.persistence.*
import org.hibernate.Hibernate
import java.sql.Date
import java.sql.Timestamp
import java.util.*

@Entity
@Table(schema = "auth", name = "verification_token")
data class VerificationToken(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = 0,

    @Column(name = "token")
    var token: String? = null,

    @Column(name = "expiry_date")
    val expiryDate: Date,

    @OneToOne(targetEntity = User::class, fetch = FetchType.EAGER, cascade = [CascadeType.PERSIST])
    @JoinColumn(nullable = false, name = "user_id")
    val user: User
) {
    constructor(token: String?, user: User) : this(0, token, calculateExpiryDate(1440), user)

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as VerificationToken

        return id != null && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id , token = $token , expiryDate = $expiryDate , user = $user )"
    }
}

private fun calculateExpiryDate(expiryTimeInMinutes: Int): Date {
    val cal = Calendar.getInstance()
    cal.time = Timestamp(cal.time.time)
    cal.add(Calendar.MINUTE, expiryTimeInMinutes)
    return Date(cal.time.time)
}