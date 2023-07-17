package com.fs.payment.repository

import com.fs.payment.model.UserEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Repository
import java.sql.ResultSet


@Repository
class OAuthDao {
    @Autowired
    private val jdbcTemplate: JdbcTemplate? = null
    fun getUserDetails(username: String): UserEntity? {
        val grantedAuthoritiesList: MutableCollection<GrantedAuthority> = ArrayList()
        val userSQLQuery = "SELECT * FROM USERS WHERE USERNAME=?"
        val list = jdbcTemplate!!.query(
            userSQLQuery, arrayOf(username)
        ) { rs: ResultSet, rowNum: Int ->
            val user = UserEntity()
            user.username = username
            user.password = rs.getString("PASSWORD")
            user
        }
        if (list.size > 0) {
            val grantedAuthority: GrantedAuthority = SimpleGrantedAuthority("ROLE_SYSTEMADMIN")
            grantedAuthoritiesList.add(grantedAuthority)
            list[0].grantedAuthoritiesList = grantedAuthoritiesList
            return list[0]
        }
        return null
    }
}