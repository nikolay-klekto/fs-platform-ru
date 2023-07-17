package com.fs.ru.registration.jpa

import javax.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "users")
data class User(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = 0,

    @Column(name = "username")
    var username: String? = null,

    @Column(name = "first_name")
    var firstName: String? = null,

    @Column(name = "last_name")
    var lastName: String? = null,

    @Column(name = "email")
    var email: String? = null,

    @Column(name = "password")
    var password: String? = null,

    @Column(name = "enabled")
    var enabled: Boolean = false,

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "users_roles",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    var roles: Collection<Role>? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as User

        return id != null && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id , username = $username , firstName = $firstName , lastName = $lastName , email = $email , password = $password , enabled = $enabled )"
    }
}