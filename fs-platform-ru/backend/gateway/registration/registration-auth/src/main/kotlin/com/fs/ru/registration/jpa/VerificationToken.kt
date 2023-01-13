package com.fs.ru.registration.jpa

import java.sql.Date
import java.sql.Timestamp
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "verification_token")
data class VerificationToken(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
}

private fun calculateExpiryDate(expiryTimeInMinutes: Int): Date {
    val cal = Calendar.getInstance()
    cal.time = Timestamp(cal.time.time)
    cal.add(Calendar.MINUTE, expiryTimeInMinutes)
    return Date(cal.time.time)
}